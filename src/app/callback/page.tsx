"use client";

import React, { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Loader from "@/components/loader";

const ReAuthenticateUser = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const { handleAuthCallback } = useAuth();
  const router = useRouter();
  useEffect(() => {
    (async () => {
      await handleAuthCallback(code as string);
      router.push("/companysettings");
    })();
  }, []);

  return <Loader />;
};

const Loading = () => <div>Loading..</div>;

const ReAuthenticator = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ReAuthenticateUser />
    </Suspense>
  );
};

export default ReAuthenticator;
