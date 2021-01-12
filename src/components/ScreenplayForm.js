import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Dropdown, Form } from 'semantic-ui-react';

const formatTypes = [
  { key: 'hollywood', text: 'Hollywood Standard', value: 'hollywood' },
  { key: 'korean', text: 'Korean Standard', value: 'korean' },
];

class ScreenplayForm extends React.Component {
  DropdownFormField = (props) => (
    <Form.Field>
      <Dropdown
        selection
        options={formatTypes}
        value={props.input.value}
        onChange={(param, data) => props.input.onChange(data.value)}
        placeholder={props.label}
      />
    </Form.Field>
  );
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className='ui error message'>
          <div className='header'>{error}</div>
        </div>
      );
    }
  }
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      //longer way of doing the same thing
      // <input
      //   onChange={formProps.input.onChange}
      //   value={formProps.input.value}
      // />
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete='off' />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className='ui form error'
      >
        <Field name='title' component={this.renderInput} label='제목:' />
        <Field name='name' component={this.renderInput} label='작가:' />
        <Field
          name='format'
          component={this.DropdownFormField}
          label='포멧을 선택해주세요 '
        />
        <button className='ui button primary'>입력</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = 'Enter Title!';
  }
  if (!formValues.name) {
    errors.name = 'Enter Writer Name!';
  }
  if (!formValues.format) {
    errors.format = 'Select a Format!';
  }
  return errors;
};

export default reduxForm({
  form: 'screenplayForm',
  validate: validate,
})(ScreenplayForm);
