import React from 'react';
import classNames from 'classnames';
import { SectionSplitProps } from '../../utils/SectionProps';
import Input from '../elements/Input';

const propTypes = {
  ...SectionSplitProps.types
}

const defaultProps = {
  ...SectionSplitProps.defaults
}

const FeaturesSplit = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  invertMobile,
  invertDesktop,
  alignTop,
  imageFill,
  isHide,
  formData,
  handleChange,
  ...props
}) => {

  const outerClasses = classNames(
    'features-split section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'features-split-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const splitClasses = classNames(
    'split-wrap',
    invertMobile && 'invert-mobile',
    invertDesktop && 'invert-desktop',
    alignTop && 'align-top'
  );

  const sectionHeader = {
    title: 'Workflow that just works',
    paragraph: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum — semper quis lectus nulla at volutpat diam ut venenatis.'
  };

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
          <div className={splitClasses}>
            {isHide && <div className="split-item">
              <div className="split-item-content center-content-mobile" data-reveal-container=".split-item">
                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  Hide
                  </div>
                  <form id='my-form'>
                    <Input required type="text" label="Plain Text" name='plain-text' className="form-input__input" value={formData["plain-text"]} onChange={handleChange}/>
                    <Input required label='Secret Password' name="password" type='password' className="form-input__input" value={formData.password} onChange={handleChange}/>
                    <br />
                    <label className='form-input_label'>Cover Image</label>
                    <input required form='my-form' type='file' accept=".jpg,.jpeg,.png" label='Cover Image' name="file" className="search-box" onChange={handleChange}/>
                  </form>
                  <br/>
              </div>
              <div className=
                  'split-item-image center-content-mobile'
                data-reveal-container=".split-item">
                  <h3 className="mt-0 mb-12">
                  Lets Hide the plain text!
                  </h3>
                <p className="m-0">
                  Hiding the plain text in the image. Password protected (of course)
                  </p>
              </div>
            </div>}

            {!isHide && <div className="split-item">
              <div className="split-item-content center-content-mobile" data-reveal-container=".split-item">
                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  Seek
                  </div>
                  <form id='my-form'>
                    <Input required label='Secret Password' name="password" type='password' className="form-input__input" value={formData.password} onChange={handleChange}/>
                    <br />
                    <label className='form-input_label'>Embedded Cover Image</label>
                    <input required form='my-form' type='file' accept=".jpg,.jpeg,.png" label='Cover Image' name="file" className="search-box" onChange={handleChange}/>
                  </form>
                  <br/>
              </div>
              <div className=
                  'split-item-image center-content-mobile'
                data-reveal-container=".split-item">
                  <h3 className="mt-0 mb-12">
                  Lets Seek the plain text!
                  </h3>
                <p className="m-0">
                  Plain text is hidden in the image. Password protected (of course).
                  </p>
              </div>
            </div>}
          </div>
        
      </div>
    </section>
  );
}

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;