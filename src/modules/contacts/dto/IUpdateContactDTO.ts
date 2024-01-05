export default interface IUpdateContactDTO {
  user_id: string;
  contact_id: string;
  name?: string;
  email?: string;
  phone?: string;
  type?: string;
}
