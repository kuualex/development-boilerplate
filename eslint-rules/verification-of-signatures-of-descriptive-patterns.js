/** @type {import('eslint').Rule.RuleModule} */
const verificationOfSignaturesRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Запрет создания типов и интерфейсов с идентичными сигнатурами свойств',
      category: 'Best Practices',
    },
    messages: {
      duplicate:
        'Сигнатура "{{ name }}" полностью совпадает с "{{ original }}". Повторное объявление структуры запрещено.',
    },
    schema: [], // Опции правила
  },
  create(context) {
    // Хранилище для найденных сигнатур: Map<signatureString, originalName>
    const seenSignatures = new Map();

    function getSignature(node) {
      let members = [];

      // Обработка интерфейсов: interface I { a: string }
      if (node.type === 'TSInterfaceDeclaration') {
        members = node.body.body;
      }
      // Обработка типов: type T = { a: string }
      else if (
        node.type === 'TSTypeAliasDeclaration' &&
        node.typeAnnotation &&
        node.typeAnnotation.type === 'TSTypeLiteral'
      ) {
        members = node.typeAnnotation.members;
      }

      if (!members || members.length === 0) return null;

      // Формируем массив строк вида "key:type", сортируем для исключения разницы в порядке
      const signatureParts = members
        .map((m) => {
          if (m.type !== 'TSPropertySignature' || (!m.key.name && !m.key.value)) return '';

          // Используем context.sourceCode для ESLint 9+ или fall-back для старых версий
          const sourceCode = context.sourceCode || context.getSourceCode();
          const typeName = m.typeAnnotation ? sourceCode.getText(m.typeAnnotation) : 'any';
          const optional = m.optional ? '?' : '';
          const keyName = m.key.name || m.key.value;

          return `${keyName}${optional}:${typeName}`;
        })
        .filter(Boolean)
        .sort();

      return signatureParts.join('|');
    }

    return {
      'TSInterfaceDeclaration, TSTypeAliasDeclaration'(node) {
        const signature = getSignature(node);
        if (!signature) return;

        if (seenSignatures.has(signature)) {
          context.report({
            node,
            messageId: 'duplicate',
            data: {
              name: node.id.name,
              original: seenSignatures.get(signature),
            },
          });
        } else {
          seenSignatures.set(signature, node.id.name);
        }
      },
    };
  },
};

export default {
  'verification-of-signatures-of-descriptive-patterns': verificationOfSignaturesRule,
};
