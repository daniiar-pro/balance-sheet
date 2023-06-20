import React from "react";
import { Oval } from "react-loader-spinner";

export const styles = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

function LoadingSpinner() {
  return (
    <>
      <div style={styles} role="status">
        <Oval
          height={80}
          width={80}
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
          timeout={1000}
        />
      </div>
    </>
  );
}

export default LoadingSpinner;
