import oracledb from "oracledb";

const connectionString = "fuck off";

export const openConnection = async () => {
  let connection = null;

  try {
    // Use the connection string copied from the cloud console
    // and stored in connstring.txt file from Step 2 of this tutorial
    connection = await oracledb.getConnection({
      user: "ADMIN",
      password: "",
      connectionString: connectionString,
    });
  } catch (error) {
    console.error("[Error] Unable to open connection", error);
  }

  return connection;
};

export const closeConnection = async (connection: oracledb.Connection) => {
  if (connection) {
    try {
      await connection.close();
      console.log("[Done] Connection closed");
    } catch (error) {
      console.error("[Error] Unable to close connection", error);
    }
  }
};
