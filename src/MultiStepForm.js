import React, { useState } from "react";
import { Formik, Form } from "formik";
import { FormStepOne } from "./forms/FormStepOne";
import { FormStepTwo } from "./forms/FormStepTwo";
import { FormSuccess } from "./forms/FormSuccess";
import { HeaderComponent } from "./HeaderComponent";
import { StepButton } from "./StepButton";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
}));

const renderStep = (step, values, errors, touched) => {
  switch (step) {
    case 1:
      return <FormStepOne errors={errors} touched={touched} />;
    case 2:
      return <FormStepTwo errors={errors} touched={touched} />;
    case 3:
      return <FormSuccess values={values} />;
    default:
      return <FormStepOne errors={errors} touched={touched} />;
  }
};

export const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const classes = useStyles();
  const formData = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    city: "",
    state: "",
    country: ""
  };
  const handleSubmit = () => setStep(step => step + 1);

  const validate = values => {
    const errors = {};
    if (!values.firstName) {
      errors.firstName = "Required";
    }

    if (!values.lastName) {
      errors.lastName = "Required";
    }

    return errors;
  };
  return (
    <>
      <HeaderComponent title="Home Exercise - Multi Step Registration Wizard" />
      <Formik
        enableReinitialize
        initialValues={{ ...formData }}
        onSubmit={handleSubmit}
        validate={validate}
      >
        {({ values, errors, touched }) => (
          <Form className={classes.form}>
            {renderStep(step, values, errors, touched)}
            <StepButton step={step} />
          </Form>
        )}
      </Formik>
    </>
  );
};
