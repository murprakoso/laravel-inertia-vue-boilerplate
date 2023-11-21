import {createQueryKeys} from "@lukemorales/query-key-factory";

export const productKeys = createQueryKeys("products", {
    lists: (queryParams) => [queryParams],
    byId: (id) => [id],
});
