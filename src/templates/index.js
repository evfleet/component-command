import dedent from 'dedent';

export const entryTemplate = `export { default } from './%n';`;

export const fileTemplate = dedent`
  import React, { Component } from 'react';

  class %n extends Component {
    render() {
      return (
        <div>
          %n
        </div>
      )
    }
  }

  export default %n;
`;

