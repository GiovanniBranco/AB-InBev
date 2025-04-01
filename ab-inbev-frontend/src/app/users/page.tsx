import UserForm from "@/components/userForm";
import UserTable from "@/components/userTable";
import { usersOptions } from "@/functions/userOptions";
import { getQueryClient } from "@/infrastructure/reactQuery/reactQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Fragment } from "react";

export default function UserPage() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(usersOptions);

  return (
    <Fragment>
      <UserForm />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UserTable />
      </HydrationBoundary>
    </Fragment>
  );
}
