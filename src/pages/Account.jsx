import UpdatePasswordForm from "../features/authentication/components/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/components/UpdateUserDataForm";
import Heading from "../shared/ui/Heading";
import Row from "../shared/ui/Row";

function Account() {
  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <Row>
        <Heading as="h3">Update user data</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as="h3">Update password</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
