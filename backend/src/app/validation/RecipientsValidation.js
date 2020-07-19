import * as Yup from 'yup';

export default {
  storeValidation: async (Data) => {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip: Yup.string().required(),
    });

    if (await schema.isValid(Data)) {
      return true;
    }
    return false;
  },
  updateValidation: async (Data) => {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.number(),
      complement: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      zip: Yup.string(),
    });

    if (await schema.isValid(Data)) {
      return true;
    }
    return false;
  },
};
