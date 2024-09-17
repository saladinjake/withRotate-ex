import React, { useEffect, useState } from "react";
import { Text, Box, Flex } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";
import Table from "@/components/table";
import Loader from "@/components/loader";
import { getAllUsers  } from "@/services";
import { UserDataType as User} from "@/services/types"
import Image from "next/image";
const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const columnHelper = createColumnHelper<User>();
  useEffect(() => {
    (async () => {
      try {
        const { data: response } = await getAllUsers();
        setUsers(response);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const columns = [
    columnHelper.accessor("name", {
      header: "NAME",
      cell: (data) => {
        return (
          <Flex alignItems="center" columnGap="4">
            <Flex
              alignItems="center"
              justifyContent="center"
              height={30}
              width={30}
              fontSize="12px"
              rounded="full"
              color="#7C8187"
              position="relative"
            >
              <Image
                src={data.row.original.picture}
                alt="pic"
                style={{ borderRadius: "100%" }}
                fill
              />
            </Flex>

            <Box>
              <Text color="#292B34" mb="0.5">
                {data.row.original.name}
              </Text>

              <Text color="#81859C" fontSize="14px">
                {data.row.original.email}
              </Text>
            </Box>
          </Flex>
        );
      },
    }),
    columnHelper.accessor("user_metadata", {
      header: "ROLE",
      cell: (data) => <>{data.row.original.user_metadata.role}</>,
    }),
    columnHelper.accessor("last_login", {
      header: "LAST ACTIVE",
      cell: (info) => (
        <Text color="#5D5F6D">
          {formatDistanceToNow(new Date(info.getValue()), {
            addSuffix: true,
            includeSeconds: true,
          })}
        </Text>
      ),
    }),
  ];

  if (isLoading) return <Loader />;

  return (
    <Box
      bg="white"
      rounded="24px"
      border="1px solid rgba(202, 206, 225, 0.2)"
      px="8"
      py="4"
    >
      <Text
        as="h2"
        fontSize="20px"
        fontWeight="500"
        borderBottom="solid"
        borderBottomColor="#AEADBE"
        borderBottomWidth="0.3px"
        pb="3"
        mb="6"
      >
        All users
      </Text>

      <Table<any, User[]> data={users} columns={columns} />
    </Box>
  );
};

export default UserManagement;
