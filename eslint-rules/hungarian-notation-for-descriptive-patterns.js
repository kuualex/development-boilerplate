const hungarianNotationRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Ensure that all interfaces begin with I, and all types begin with T.',
    },
    schema: [],
  },
  create(context) {
    return {
      TSInterfaceDeclaration(node) {
        if (!node.id.name.startsWith('I')) {
          context.report({
            node: node.id,
            message: 'The interface name "{{name}}" must begin with "I".',
            data: { name: node.id.name },
          });
        }
      },
      TSTypeAliasDeclaration(node) {
        if (!node.id.name.startsWith('T')) {
          context.report({
            node: node.id,
            message: 'The type name "{{name}}" must begin with "T"',
            data: { name: node.id.name },
          });
        }
      },
    };
  },
};

export default {
  'hungarian-notation-for-descriptive-patterns': hungarianNotationRule,
};
