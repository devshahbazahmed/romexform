import { trpc } from "~/trpc/client";

export function useCreateForm() {
  const utils = trpc.useUtils();
  const {
    mutateAsync: createFormAsync,
    mutate: createForm,
    error,
    failureCount,
    isError,
    isIdle,
    isPending,
    isSuccess,
    status,
  } = trpc.form.createForm.useMutation({
    onSuccess: async () => {
      await utils.form.invalidate();
    },
  });

  return {
    createFormAsync,
    createForm,
    error,
    failureCount,
    isError,
    isIdle,
    isPending,
    isSuccess,
    status,
  };
}

export function useListForms() {
  const {
    data: forms,
    error,
    isFetched,
    isFetching,
    isLoading,
    status,
  } = trpc.form.listForms.useQuery();

  return {
    forms,
    error,
    isFetched,
    isFetching,
    isLoading,
    status,
  };
}

export function useGetFormWithFields(formId: string) {
  const {
    data: form,
    error,
    isFetched,
    isFetching,
    isLoading,
    status,
  } = trpc.form.getFormWithFields.useQuery({ formId });

  return {
    form,
    error,
    isFetched,
    isFetching,
    isLoading,
    status,
  };
}
