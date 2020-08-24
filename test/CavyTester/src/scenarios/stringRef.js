import React, { Component } from 'react';
import { Button, TextInput } from 'react-native';
import { hook } from 'cavy';

export const key = 'StringRef';
const inputId = `${key}.Input`;
const buttonId = `${key}.Button`;

class StringRefTest extends Component {
  constructor(props) {
    super(props);
    this.focusTextInput = this.focusTextInput.bind(this);
  }
  
  focusTextInput() {
    this.refs.textInput.focus();
  };

  render() {
    const { generateTestHook } = this.props;
    return (
      <>
        <TextInput
          ref={generateTestHook.bind(this)(inputId, 'textInput')} />
        <Button
          ref={generateTestHook(buttonId)}
          onPress={this.focusTextInput}
          title='Focus the text input' />
      </>
    );
  }
}

export const Screen = hook(StringRefTest);

export const label = 'spec.stringRef retains functionality of legacy string refs';
export const spec = spec =>
  spec.describe(key, () =>
    spec.it(label, async () => {
      const input = await spec.findComponent(inputId);
      if (input.isFocused()) {
        throw new Error(`Expected input not to be focused, but it is`);
      }
      await spec.press(buttonId);
      if (!input.isFocused()) {
        throw new Error(`Expected input to be focused, but it is not`);
      }
    })
  );
