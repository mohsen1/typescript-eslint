import rule from '../../src/rules/no-empty-function';
import { RuleTester } from '../RuleTester';

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run('no-empty-function', rule, {
  valid: [
    {
      code: `class Person {
        private name: string
        constructor(name: string) {
          this.name = name;
        }
      }`,
    },
    {
      code: `class Person {
        constructor(private name: string) {}
      }`,
    },
    {
      code: `class Person {
        constructor(name: string) {}
      }`,
      options: [{ allow: ['constructors'] }],
    },
    {
      code: `class Person {
        otherMethod(name: string) {}
      }`,
      options: [{ allow: ['methods'] }],
    },
    {
      code: `
class Foo {
  private constructor() {}
}
      `,
      options: [{ allow: ['private-constructors'] }],
    },
    {
      code: `
class Foo {
  protected constructor() {}
}
      `,
      options: [{ allow: ['protected-constructors'] }],
    },
    {
      code: `
function foo() {
  const a = null;
}
      `,
    },
  ],

  invalid: [
    {
      code: `class Person {
        constructor(name: string) {}
      }`,
      errors: [
        {
          messageId: 'unexpected',
          data: {
            name: 'constructor',
          },
          line: 2,
          column: 35,
        },
      ],
    },
    {
      code: `class Person {
        otherMethod(name: string) {}
      }`,
      errors: [
        {
          messageId: 'unexpected',
          data: {
            name: "method 'otherMethod'",
          },
          line: 2,
          column: 35,
        },
      ],
    },
    {
      code: `
class Foo {
  private constructor() {}
}
      `,
      errors: [
        {
          messageId: 'unexpected',
          data: {
            name: 'constructor',
          },
          line: 3,
          column: 25,
        },
      ],
    },
    {
      code: `
class Foo {
  protected constructor() {}
}
      `,
      errors: [
        {
          messageId: 'unexpected',
          data: {
            name: 'constructor',
          },
          line: 3,
          column: 27,
        },
      ],
    },
    {
      code: `
function foo() {
}
      `,
      errors: [
        {
          messageId: 'unexpected',
          data: {
            name: "function 'foo'",
          },
          line: 2,
          column: 16,
        },
      ],
    },
  ],
});