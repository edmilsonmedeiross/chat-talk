import { NextRouter } from "next/router";
import { UseFormSetError } from "react-hook-form";
import { z } from "zod";

import {
  userExists,
  usernameOrEmailExists,
  setUsersToLocalStorage,
} from "@/lib/utils";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { handleLogin } from "@/app/actions";

type FormValues = {
  username: string;
  email: string;
  repeatEmail?: string;
};

type Props = {
  formSchema: z.ZodType<any, any, any>;
  router: NextRouter | AppRouterInstance;
  setError: UseFormSetError<FormValues>;
  pathName?: string;
};

export const useFormSubmit = ({
  formSchema,
  router,
  setError,
  pathName,
}: Props) => {
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (pathName === "/register") {
      if (userExists(values)) {
        setError("username", {
          type: "manual",
          message: "Usuário já existe.",
        });

        return;
      }

      if (usernameOrEmailExists(values)) {
        setError("username", {
          type: "manual",
          message: "Usuário ou email já existe.",
        });

        setError("email", {
          type: "manual",
          message: "Usuário ou email já existe.",
        });

        return;
      }

      setUsersToLocalStorage(values);
      router.push("/login");
    }

    if (pathName === "/login") {
      if (!userExists(values)) {
        setError("username", {
          type: "manual",
          message: "Usuário não existe.",
        });

        setError("email", {
          type: "manual",
          message: "Usuário não existe.",
        });

        return;
      }

      if (!usernameOrEmailExists(values)) {
        setError("username", {
          type: "manual",
          message: "Usuário ou email incorretos.",
        });

        setError("email", {
          type: "manual",
          message: "Usuário ou email incorretos.",
        });

        return;
      }
      handleLogin(values);
      router.push("/");
    }
  };

  return { onSubmit };
};
