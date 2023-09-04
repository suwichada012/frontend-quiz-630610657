import { API_URL } from "@/utils/api";

import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { Input, Button, Card, Title, Stack, TextInput } from "@mantine/core";

const schema = z.object({
  firstName: z.string().min(3, {
    message: "First Name is required and must be at least 3 characters.",
  }),
  lastName: z.string().min(3, {
    message: "Last Name is required and must be at least 3 characters.",
  }),
  email: z.string().email({ message: "Invalid email format" }),
  amount: z.string().refine(
    (value) => {
      const numericValue = parseFloat(value);
      return !isNaN(numericValue) && numericValue >= 1000;
    },
    {
      message:
        "Invalid donation amount. It must be a number greater than or equal to 1000.",
    }
  ),
});

// export function getInitData(blank = false) {
//   if (blank) {
//     return {
//       firstName: "",
//       lastName: "",
//       email: "",
//       dateOfBirth: "",
//       password: "",
//       confirmPassword: "",
//     };
//   }

export default function DonationForm() {
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      amount: "",
    },
    validate: zodResolver(schema),
  });

  return (
    <Card withBorder shadow="xs" p="xl" bg="cyan.2">
      <Title order={1} color="blue">
        Donate
      </Title>

      <form>
        <Stack spacing="xs">
          <Input.Wrapper>
            <Input.Label>First Name</Input.Label>
            <TextInput {...form.getInputProps("firstName")} />
            {form.errors.firstName && (
              <Input.Error>
                First Name is required and must be at least 3 characters.
              </Input.Error>
            )}
          </Input.Wrapper>

          <Input.Wrapper>
            <Input.Label>Last Name</Input.Label>
            <TextInput {...form.getInputProps("lastName")} />
            {form.errors.lastName && (
              <Input.Error>
                Last Name is required and must be at least 3 characters.
              </Input.Error>
            )}
          </Input.Wrapper>

          <Input.Wrapper>
            <Input.Label>Email</Input.Label>
            <TextInput {...form.getInputProps("email")} />
            {form.errors.email && (
              <Input.Error>Invalid email format</Input.Error>
            )}
          </Input.Wrapper>

          <Input.Wrapper>
            <Input.Label>Donation Amount</Input.Label>
            <TextInput {...form.getInputProps("amount")} />
            {form.errors.amount && (
              <Input.Error>
                Invalid donation amount. It must be a number greater than or
                equal to 1000.
              </Input.Error>
            )}
          </Input.Wrapper>
          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </Card>
  );
}
