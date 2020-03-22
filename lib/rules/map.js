module.exports = {
  "map": {
    meta: {
      docs: {
        description: 'Replace the lodash map to the native js mao',
        category: 'Best Practices',
        recommended: true,
      },
      fixable: 'code',
      schema: [],
    },
    create: context => {
      return {
        CallExpression(node) {

          // Находим все выражения `_.map(...)`
          if (node.type === 'CallExpression'
            && node.callee.property
            && node.callee.property.name === 'map'
            && node.callee.object.name === '_')
          {
            // Определяем аргументы (предполагаем, что их всегда 2, т.е. что в коде _.map вызван верно)
            const collectionNode = node.arguments[0];
            const collection = context.getSource(collectionNode);
            const fnNode = node.arguments[1];
            const fn = context.getSource(fnNode);

            // Если в качестве первого аргумента _.map передается Объект - сразу выходим (предпреждение не требуется)
            if (collectionNode.type === 'ObjectExpression') return;

            // Определяем есть ли УЖЕ перед _.map проверка isArray
            const ancestors = context.getAncestors(node);
            const isArrayCondition = `Array.isArray(${collection})`;

            const isArrayExist = ancestors.some(ancestor => {
              const isConditionNode = ancestor.type === 'IfStatement' || ancestor.type === 'ConditionalExpression';
              const isConditionCorrect = context.getSource(ancestor.test) === isArrayCondition;
              return isConditionNode && isConditionCorrect;
            });

            // Если перед _.map уже есть проверка - выходим
            if (isArrayExist) return;

            // В остальных случаях выводим предупреждение и при необходимости заменяем _.map
            let message, code;
            // Если в качестве первого аргумента _.map передается Массив - заменяем его на нативный map
            if (collectionNode.type === 'ArrayExpression') {
              message = 'Lodash method "map" can be replaced to js native method "map"';
              code =  `${collection}.map(${fn})`;
            }
            // Во всех остальных случаях заменяем _.map на проверку isArray
            else {
              message = 'Lodash method "map" can be replaced to js native method "map" (through condition)';
              code = `Array.isArray(${collection}) ? ${collection}.map(${fn}) : _.map(${collection}, ${fn})`;
            }

            // Выводим предупреждение
            context.report({
              node,
              message: message,
              fix: function(fixer) {
                return fixer.replaceText(node, code.toString());
              }
            });
          }
        }
      };
    }
  }
};
