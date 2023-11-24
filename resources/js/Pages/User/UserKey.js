import {createQueryKeys} from "@lukemorales/query-key-factory";

export const userKeys = createQueryKeys("users", {
    lists: (queryParams) => [queryParams],
    byId: (id) => [id],
});
