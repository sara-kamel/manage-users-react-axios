import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    VStack,
  } from "@chakra-ui/react";
import { addUser } from "./apiHelper";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function AddUser({onAdd, onError}){


    const formik = useFormik({
        initialValues: {
          name: "",
          email: "",
        },
        onSubmit: async (values) => {
          const respone = await addUser(values.name, values.email);
          if (!respone.error) {
            onAdd(respone.data)
            // setUsers([...users, respone.data]);
            formik.resetForm()
          } else {
            onError(respone.error)
            // setError(respone.error);
          }
          alert(JSON.stringify(values, null, 2));
        },
        validationSchema: Yup.object({
          name: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Required"),
          email: Yup.string().email("Invalid email").required("Required"),
        }),
      });

    return(
<>
<Box>
        <VStack w="1024px" p={32} alignItems="flex-start">
          <Heading as="h1" id="contactme-section">
            Add User
          </Heading>
          <Box p={6} rounded="md" w="100%">
            <form onSubmit={formik.handleSubmit}>
              <VStack spacing={4}>
                <FormControl
                  isInvalid={formik.touched.name && !!formik.errors.name}
                >
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    id="name"
                    name="name"
                    {...formik.getFieldProps("name")}
                  />
                  <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={formik.touched.email && !!formik.errors.email}
                >
                  <FormLabel htmlFor="email">Email Address</FormLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    {...formik.getFieldProps("email")}
                  />
                  <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                </FormControl>
                <Button
                  type="submit"
                  colorScheme="purple"
                  width="full"
                  disabled={formik.isSubmitting}
                >
                  Submit
                </Button>
              </VStack>
            </form>
          </Box>
        </VStack>
      </Box>
</>
    )
}