import { ListParticipant } from "./ListParticipant";

export type List = {
  listUuid: string;
  title: string;
  description: string;
  participants: ListParticipant[];
  createdAt: string;
  updatedAt: string;
};
