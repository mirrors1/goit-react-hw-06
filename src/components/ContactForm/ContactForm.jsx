import { Formik, Form, Field, ErrorMessage } from 'formik';
import s from './ContactForm.module.css';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
//Імпортуємо хук
import { useDispatch } from 'react-redux';
//Імпортуємо фабрику екшену
import { addContact } from '../../redux/contactsSlice';

const AddContactForm = () => {
  //Отримуємо посилання на функцію відправки екшенів
  const dispatch = useDispatch();

  const initialValues = {
    name: '',
    number: '',
    group: 'other',
  };
  const phoneRegex = /^(\d{3}-\d{3}-\d{4}|\d{10})$/;
  const nameRegex = /^[A-Za-zА-Яа-яЄєІіЇїҐґ-\s]+$/;

  const ContactSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'The name must contain more than 3 characters')
      .max(50, 'The name must contain up to 50 characters')
      .required('This field is required')
      .matches(nameRegex, 'Enter only letters'),
    number: Yup.string()
      .required('This field is required')
      .min(10, 'The number must contain at least 10 characters')
      .matches(phoneRegex, 'Phone number format ХХХ-ХХХ-ХХХХ'),
    group: Yup.string().oneOf(['family', 'work', 'other']).required('Required'),
  });

  const handleNumberChange = (e, setFieldValue) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 3 && value.length <= 6) {
      value = `${value.slice(0, 3)}-${value.slice(3)}`;
    } else if (value.length > 6) {
      value = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6, 10)}`;
    }
    setFieldValue('number', value);
  };

  const handleSubmit = (values, action) => {
    values.id = nanoid();
    dispatch(addContact(values));
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
            <label className={s.label}>
              Group
              <Field as="select" name="group" className={s.field}>
                <option value="family">Family</option>
                <option value="work">Work</option>
                <option value="other">Other</option>
              </Field>
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
export default AddContactForm;
