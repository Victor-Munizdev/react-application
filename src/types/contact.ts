export interface Contact {
  id: string
  name: string
  email: string
  phone: string
  category: string
  createdAt: string
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  category: string
}

export type SortOrder = "asc" | "desc"

export interface UseContactsReturn {
  contacts: Contact[]
  addContact: (contactData: Omit<Contact, "id" | "createdAt">) => void
  updateContact: (id: string, contactData: Omit<Contact, "id" | "createdAt">) => void
  deleteContact: (id: string) => void
}
