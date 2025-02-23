import { Formik, Form, Field, ErrorMessage } from 'formik';
import s from './ContactForm.module.css';
import * as Yup from 'yup';

const ContactForm = ({ newContact }) => {
  const initialValues = {
    name: '',
    number: '',
  };
  const phoneRegex = /^(\d{3}-\d{2}-\d{2}|\d{7})$/;
  const nameRegex = /^[A-Za-zА-Яа-яЄєІіЇїҐґ-\s]+$/;

  const ContactSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'The name must contain more than 3 characters')
      .max(50, 'The name must contain up to 50 characters')
      .required('This field is required')
      .matches(nameRegex, 'Enter only letters'),
    number: Yup.string()
      .required('This field is required')
      .min(7, 'The number must contain at least 7 characters')
      // .max(9, 'The number must contain up to 9 characters')
      .matches(phoneRegex, 'Phone number format ХХХ-ХХ-ХХ'),
  });

  const handleNumberChange = (e, setFieldValue) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 3 && value.length <= 5) {
      value = `${value.slice(0, 3)}-${value.slice(3)}`;
    } else if (value.length > 5) {
      value = `${value.slice(0, 3)}-${value.slice(3, 5)}-${value.slice(5, 7)}`;
    }
    setFieldValue('number', value);
  };

  const handleSubmit = (values, action) => {
    newContact(values);
    action.resetForm();
  };

  return (
    <section className={s.formWrapper}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={ContactSchema}
      >
        {({ setFieldValue }) => (
          <Form className={s.form}>
            <label className={s.label}>
              Name
              <Field className={s.field} type="text" name="name" />
              <ErrorMessage name="name" component="span" />
            </label>
            <label className={s.label}>
              Number
              {/* <Field className={s.field} type="tel" name="number" />
               */}
              <Field name="number">
                {({ field }) => (
                  <input
                    {...field}
                    type="tel"
                    className={s.field}
                    onChange={e => handleNumberChange(e, setFieldValue)}
                  />
                )}
              </Field>
              <ErrorMessage name="number" component="span" />
            </label>
            <button className={s.btn} type="submit">
              Add contact
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};
export default ContactForm;
