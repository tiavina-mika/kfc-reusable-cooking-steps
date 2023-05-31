import * as Yup from "yup";

export const RecipeProductionStepsSchema = Yup.object().shape({
  sections: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Obligatoire"),
      productionSteps: Yup.array().of(
        Yup.object().shape({
          name: Yup.string(),
          description: Yup.string().required("Obligatoire"),
          machineSetting: Yup.string(),
          transformation: Yup.string(),
          stepDurationUnit: Yup.string(),
          stepDuration: Yup.number()
          // stepComponents: Yup.array().of(
          //   Yup.object().shape({
          //     supplierItem: Yup.mixed().notOneOf(
          //       [null, undefined],
          //       "Obligatoire"
          //     ),
          //     grossWeight: Yup.number().required("Obligatoire"),
          //     cookingMode: Yup.mixed().notOneOf(
          //       [null, undefined],
          //       "Obligatoire"
          //     )
          //   })
          // )
        })
      )
    })
  )
});

export const ReusableProductionStepSchema = Yup.object().shape({
  name: Yup.string().required("Obligatoire"),
  productionSteps: Yup.array().of(
    Yup.object().shape({
      name: Yup.string(),
      description: Yup.string().required("Obligatoire"),
      machineSetting: Yup.string(),
      transformation: Yup.string(),
      stepDurationUnit: Yup.string(),
      stepDuration: Yup.number()
    })
  )
});
