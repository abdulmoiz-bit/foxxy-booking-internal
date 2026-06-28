import SignupForm from "../features/authentication/components/SignupForm";
import Heading from "../shared/ui/Heading";

function NewUsers() {
  return (
    <>
      <Heading as="h1">Create a new user</Heading>
      <SignupForm />
    </>
  );
}

export default NewUsers;
