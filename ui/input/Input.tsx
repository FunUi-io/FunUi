import * as React from 'react';

type InputProps = {
  select?: boolean;
  bordered?: boolean;
  bordereless?: boolean;
  multiline?: boolean;
  file?: boolean;
  noBorder?: boolean;
  icon?: React.ReactNode;
  button?: React.ReactNode;
  id?: string;
  status?: 'success' | 'warning' | 'danger' | '';
  funcss?: string;
  flat?: boolean;
  leftRounded?: boolean;
  rightRounded?: boolean;
  rounded?: boolean;
  fullWidth?: boolean;
  type?: string;
  label?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  options?: { value: string; text: string }[];
  rows?: number;
  bg:string
};

export default class Input extends React.Component<InputProps> {
  render() {
    if (this.props.select) {
      if (this.props.bordered) {
        return (
          <select
            id={this.props.id}
            className={`
              ${this.props.status === 'success' ? 'success-input' : ''}
              ${this.props.status === 'warning' ? 'warning-input' : ''}
              ${this.props.status === 'danger' ? 'danger-input' : ''}
              input
              ${this.props.bg ? this.props.bg : ''}
              ${this.props.funcss} ${this.props.flat ? 'flat' : ''}
              ${this.props.leftRounded ? 'leftRounded' : this.props.rightRounded ? 'rightRounded' : ''}
              borderedInput
            `}
            onChange={this.props.onChange}
            defaultValue={this.props.defaultValue}
            typeof={this.props.type}
            name={this.props.name}
            style={{
              borderRadius: `${this.props.rounded ? '400rem' : ''}`,
              width: `${this.props.fullWidth ? '100%' : ''}`,
            }}
            value={this.props.value}
          >
            {this.props.options
              ? this.props.options.map((doc) => (
                  <option value={doc.value} key={doc.value}>
                    {doc.text}
                  </option>
                ))
              : ''}
          </select>
        );
      } else if (this.props.bordereless) {
        return (
          <select
            id={this.props.id}
            className={`
              ${this.props.status === 'success' ? 'success-input' : ''}
              ${this.props.status === 'warning' ? 'warning-input' : ''}
              ${this.props.status === 'danger' ? 'danger-input' : ''}
              input
              ${this.props.bg ? this.props.bg : ''}
              ${this.props.funcss} ${this.props.flat ? 'flat' : ''}
              ${this.props.leftRounded ? 'leftRounded' : this.props.rightRounded ? 'rightRounded' : ''}
              borderless
            `}
            onChange={this.props.onChange}
            defaultValue={this.props.defaultValue}
            typeof={this.props.type}
            placeholder={this.props.label}
            name={this.props.name}
            value={this.props.value}
            style={{
              borderRadius: `${this.props.rounded ? '400rem' : ''}`,
              width: `${this.props.fullWidth ? '100%' : ''}`,
            }}
          >
            {this.props.options
              ? this.props.options.map((doc) => (
                  <option value={doc.value} key={doc.value}>
                    {doc.text}
                  </option>
                ))
              : ''}
          </select>
        );
      } else {
        return (
          <select
            id={this.props.id}
            className={`
              ${this.props.status === 'success' ? 'success-input' : ''}
              ${this.props.status === 'warning' ? 'warning-input' : ''}
              ${this.props.status === 'danger' ? 'danger-input' : ''}
              input
              ${this.props.bg ? this.props.bg : ''}
              ${this.props.funcss} ${this.props.flat ? 'flat' : ''}
              ${this.props.leftRounded ? 'leftRounded' : this.props.rightRounded ? 'rightRounded' : ''}
            `}
            onChange={this.props.onChange}
            defaultValue={this.props.defaultValue}
            typeof={this.props.type}
            placeholder={this.props.label}
            name={this.props.name}
            value={this.props.value}
            style={{
              borderRadius: `${this.props.rounded ? '400rem' : ''}`,
              width: `${this.props.fullWidth ? '100%' : ''}`,
            }}
          >
            {this.props.options
              ? this.props.options.map((doc) => (
                  <option value={doc.value} key={doc.value}>
                    {doc.text}
                  </option>
                ))
              : ''}
          </select>
        );
      }
    } else if (this.props.multiline) {
      if (this.props.bordered) {
        return (
          <textarea
            id={this.props.id}
            className={`
              ${this.props.status === 'success' ? 'success-input' : ''}
              ${this.props.status === 'warning' ? 'warning-input' : ''}
              ${this.props.status === 'danger' ? 'danger-input' : ''}
              input
              ${this.props.bg ? this.props.bg : ''}
              ${this.props.funcss} ${this.props.flat ? 'flat' : ''}
              ${this.props.leftRounded ? 'leftRounded' : this.props.rightRounded ? 'rightRounded' : ''}
              borderedInput
            `}
            onChange={this.props.onChange}
            defaultValue={this.props.defaultValue}
            typeof={this.props.type}
            placeholder={this.props.label}
            name={this.props.name}
            style={{
              borderRadius: `${this.props.rounded ? '400rem' : ''}`,
              width: `${this.props.fullWidth ? '100%' : ''}`,
            }}
            value={this.props.value}
            rows={this.props.rows ? this.props.rows : 2}
          />
        );
      } else if (this.props.bordereless) {
        return (
          <textarea
            id={this.props.id}
            className={`
              ${this.props.status === 'success' ? 'success-input' : ''}
              ${this.props.status === 'warning' ? 'warning-input' : ''}
              ${this.props.status === 'danger' ? 'danger-input' : ''}
              input
              ${this.props.bg ? this.props.bg : ''}
              ${this.props.funcss} ${this.props.flat ? 'flat' : ''}
              ${this.props.leftRounded ? 'leftRounded' : this.props.rightRounded ? 'rightRounded' : ''}
              borderless
            `}
            onChange={this.props.onChange}
            defaultValue={this.props.defaultValue}
            typeof={this.props.type}
            placeholder={this.props.label}
            name={this.props.name}
            value={this.props.value}
            style={{
              borderRadius: `${this.props.rounded ? '400rem' : ''}`,
              width: `${this.props.fullWidth ? '100%' : ''}`,
            }}
            rows={this.props.rows ? this.props.rows : 2}
          />
        );
      } else {
        return (
          <textarea
            id={this.props.id}
            className={`
              ${this.props.status === 'success' ? 'success-input' : ''}
              ${this.props.status === 'warning' ? 'warning-input' : ''}
              ${this.props.status === 'danger' ? 'danger-input' : ''}
              input
              ${this.props.bg ? this.props.bg : ''}
              ${this.props.funcss} ${this.props.flat ? 'flat' : ''}
              ${this.props.leftRounded ? 'leftRounded' : this.props.rightRounded ? 'rightRounded' : ''}
            `}
            onChange={this.props.onChange}
            defaultValue={this.props.defaultValue}
            typeof={this.props.type}
            placeholder={this.props.label}
            name={this.props.name}
            value={this.props.value}
            style={{
              borderRadius: `${this.props.rounded ? '400rem' : ''}`,
              width: `${this.props.fullWidth ? '100%' : ''}`,
            }}
            rows={this.props.rows ? this.props.rows : 2}
          />
        );
      }
    } else if (this.props.file) {
      return (
        <div className={`fileInputContainer ${this.props.noBorder ? 'borderless' : ''}`}>
          <div>
            {this.props.icon ? (
              this.props.icon
            ) : (
              <i className="fas icon size-big text-secondary fa-upload" />
            )}
            <br />
            <div className="text-secondary" style={{ margin: '0.3rem 0' }}>
              {this.props.label}
            </div>
          </div>
          <div className="fileInput">
            {this.props.button ? (
              this.props.button
            ) : (
              <button className={`primary button full-width`}> Upload File</button>
            )}
            <input
              id={this.props.id}
              className={`
                ${this.props.status === 'success' ? 'success-input' : ''}
                ${this.props.status === 'warning' ? 'warning-input' : ''}
                ${this.props.status === 'danger' ? 'danger-input' : ''}
                input
                ${this.props.bg ? this.props.bg : ''}
                ${this.props.funcss} ${this.props.flat ? 'flat' : ''}
                ${this.props.leftRounded ? 'leftRounded' : this.props.rightRounded ? 'rightRounded' : ''}
                borderedInput
                filedInput
              `}
              onChange={this.props.onChange}
              typeof={'file'}
              name={this.props.name}
              style={{
                borderRadius: `${this.props.rounded ? '400rem' : ''}`,
                width: `${this.props.fullWidth ? '100%' : ''}`,
              }}
              value={this.props.value}
            />
          </div>
        </div>
      );
    } else {
      if (this.props.bordered) {
        return (
          <input
            id={this.props.id}
            className={`
              ${this.props.status === 'success' ? 'success-input' : ''}
              ${this.props.status === 'warning' ? 'warning-input' : ''}
              ${this.props.status === 'danger' ? 'danger-input' : ''}
              input
              ${this.props.bg ? this.props.bg : ''}
              ${this.props.funcss} ${this.props.flat ? 'flat' : ''}
              ${this.props.leftRounded ? 'leftRounded' : this.props.rightRounded ? 'rightRounded' : ''}
              borderedInput
            `}
            onChange={this.props.onChange}
            defaultValue={this.props.defaultValue}
            typeof={this.props.type}
            placeholder={this.props.label}
            name={this.props.name}
            style={{
              borderRadius: `${this.props.rounded ? '400rem' : ''}`,
              width: `${this.props.fullWidth ? '100%' : ''}`,
            }}
            value={this.props.value}
          />
        );
      } else if (this.props.bordereless) {
        return (
          <input
            id={this.props.id}
            className={`
              ${this.props.status === 'success' ? 'success-input' : ''}
              ${this.props.status === 'warning' ? 'warning-input' : ''}
              ${this.props.status === 'danger' ? 'danger-input' : ''}
              input
              ${this.props.bg ? this.props.bg : ''}
              ${this.props.funcss} ${this.props.flat ? 'flat' : ''}
              ${this.props.leftRounded ? 'leftRounded' : this.props.rightRounded ? 'rightRounded' : ''}
              borderless
            `}
            onChange={this.props.onChange}
            defaultValue={this.props.defaultValue}
            typeof={this.props.type}
            placeholder={this.props.label}
            name={this.props.name}
            value={this.props.value}
            style={{
              borderRadius: `${this.props.rounded ? '400rem' : ''}`,
              width: `${this.props.fullWidth ? '100%' : ''}`,
            }}
          />
        );
      } else {
        return (
          <input
            id={this.props.id}
            className={`
              ${this.props.status === 'success' ? 'success-input' : ''}
              ${this.props.status === 'warning' ? 'warning-input' : ''}
              ${this.props.status === 'danger' ? 'danger-input' : ''}
              input
              ${this.props.bg ? this.props.bg : ''}
              ${this.props.funcss} ${this.props.flat ? 'flat' : ''}
              ${this.props.leftRounded ? 'leftRounded' : this.props.rightRounded ? 'rightRounded' : ''}
            `}
            onChange={this.props.onChange}
            defaultValue={this.props.defaultValue}
            typeof={this.props.type}
            placeholder={this.props.label}
            name={this.props.name}
            value={this.props.value}
            style={{
              borderRadius: `${this.props.rounded ? '400rem' : ''}`,
              width: `${this.props.fullWidth ? '100%' : ''}`,
            }}
          />
        );
      }
    }
  }
}
