import { eth } from "./eth.js"; // Competition state provider

/**
 * State providing wrapper
 * @param {ReactElement | ReactElement[]} children to inject
 * @returns {ReactElement} wrapper
 */
export default function StateProvider({ children }) {
  return <eth.Provider>{children}</eth.Provider>;
}
