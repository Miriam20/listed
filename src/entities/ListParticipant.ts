export enum ListParticipantRole {
  Owner = "owner",
  Guest = "guest",
}

export type ListParticipant = {
  email: string;
  role: ListParticipantRole;
};
