import * as Yup from 'yup';

export default {
  storeValidation: async (Data) => {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
    });

    if (await schema.isValid(Data)) {
      return true;
    }
    return false;
  },
  updateValidation: async (Data) => {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
    });

    if (await schema.isValid(Data)) {
      return true;
    }
    return false;
  },
};
