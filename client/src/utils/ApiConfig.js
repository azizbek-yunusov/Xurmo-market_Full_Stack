import { useSelector } from "react-redux";


export const ApiConfig = () => {
  const { access_token } = useSelector((state) => state.auth);

}