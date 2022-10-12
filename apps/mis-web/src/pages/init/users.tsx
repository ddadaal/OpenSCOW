import { Result } from "antd";
import { GetServerSideProps, NextPage } from "next";
import { SSRProps } from "src/auth/server";
import { UnifiedErrorPage } from "src/components/errorPages/UnifiedErrorPage";
import { InitDrawer } from "src/pageComponents/init/InitLayout";
import { InitUsersAndAccountsTable } from "src/pageComponents/init/InitUsersAndAccountsTable";
import { queryIfInitialized } from "src/utils/init";

type Props = SSRProps<{}>;

export const UsersPage: NextPage<Props> = (props) => {
  if ("error" in props) {
    return (
      <UnifiedErrorPage code={props.error}
        customComponents={{
          409: (
            <Result
              status="error"
              title="系统已初始化"
              subTitle="系统已经初始化完成，无法重新初始化！"
            />
          ),
        }}
      />
    );
  }
  return (
    <div>
      <InitDrawer>
        <InitUsersAndAccountsTable/>
      </InitDrawer>
    </div>
  );

};

export const getServerSideProps: GetServerSideProps<Props> = async () => {

  const result = await queryIfInitialized();

  if (result) { return { props: { error: 409 } }; }

  return { props: {} };

};


export default UsersPage;