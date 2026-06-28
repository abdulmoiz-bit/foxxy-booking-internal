import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../../shared/ui/ButtonIcon";
import { useLogout } from "../hooks/useLogout";
import SpinnerMini from "../../../shared/ui/SpinnerMini";

function Logout() {
  const { logout, isLoading } = useLogout();

  return (
    <ButtonIcon disabled={isLoading} onClick={logout}>
      {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
