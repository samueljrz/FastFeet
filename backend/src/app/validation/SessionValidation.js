import * as Yup from 'yup';

export default async (Data) => {
  const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  if (await schema.isValid(Data)) {
    return true;
  }
  return false;
};
