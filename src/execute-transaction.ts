import {
  openConnection,
  closeConnection,
} from "./db-utils/connection-utils.js";

// WIP this is not done
export const combinedTransactions = async (
  transactions: any,
  withCommit: boolean
) => {
  const connection = await openConnection();

  if (!connection) {
    return null;
  }

  try {
    await connection.execute(
      `begin execute immediate 'drop table nodetab'; exception when others then if sqlcode <> -942 then raise; end if; end;`
    );

    await connection.execute(
      `create table nodetab (id number, data varchar2(20))`
    ); // Insert some rows
    const sql = `INSERT INTO nodetab VALUES (:1, :2)`;
    const binds = [
      [1, "First"],
      [2, "Second"],
      [3, "Third"],
      [4, "Fourth"],
      [5, "Fifth"],
      [6, "Sixth"],
      [7, "Seventh"],
      [26, "George"],
    ];

    await connection.executeMany(sql, binds);

    if (withCommit) {
      await connection.commit();
    }

    return "DB transaction complete.";
  } catch (error) {
    console.error("[Error] Unable to execute db operations.", error);
    return null;
  } finally {
    closeConnection(connection);
  }
};

export const runSelectQuery = async (selectQuery: string) => {
  const connection = await openConnection();

  if (!connection) {
    return null;
  }

  try {
    const result = await connection.execute(selectQuery);
    return result.rows;
  } catch (error) {
    console.error("[Error] Unable to execute db operations.", error);
    return null;
  } finally {
    closeConnection(connection);
  }
};

export const singleTransaction = async (
  transaction: string,
  withCommit = true
) => {
  const connection = await openConnection();

  if (!connection) {
    return null;
  }

  try {
    await connection.execute(transaction);

    if (withCommit) {
      await connection.commit();
    }

    return "DB transaction complete.";
  } catch (error) {
    console.error("[Error] Unable to execute db operations.", error);
    return null;
  } finally {
    closeConnection(connection);
  }
};
