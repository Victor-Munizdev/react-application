"use client"

import type React from "react"
import { useEffect, useState } from "react"
import styles from "./page.module.css"

interface Contact {
  id: string
  name: string
  email: string
  phone: string
  category: string
}

export default function MyContacts() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "INSTAGRAM",
  })

  // Carregar dados iniciais
  useEffect(() => {
    const saved = localStorage.getItem("mycontacts")
    if (saved) {
      setContacts(JSON.parse(saved))
    } else {
      const initial: Contact[] = [
        {
          id: "1",
          name: "Mateus Silva",
          email: "mateus@devacademy.com.br",
          phone: "(41) 99999-9999",
          category: "INSTAGRAM",
        },
        {
          id: "2",
          name: "Ana Costa",
          email: "ana@devacademy.com.br",
          phone: "(41) 98888-8888",
          category: "INSTAGRAM",
        },
        {
          id: "3",
          name: "João Santos",
          email: "joao@devacademy.com.br",
          phone: "(41) 97777-7777",
          category: "INSTAGRAM",
        },
      ]
      setContacts(initial)
    }
  }, [])

  // Salvar no localStorage
  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem("mycontacts", JSON.stringify(contacts))
    }
  }, [contacts])

  // Filtrar contatos
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm),
  )

  const openModal = (contact?: Contact) => {
    if (contact) {
      setFormData({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        category: contact.category,
      })
      setEditingId(contact.id)
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        category: "INSTAGRAM",
      })
      setEditingId(null)
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingId(null)
    setFormData({
      name: "",
      email: "",
      phone: "",
      category: "INSTAGRAM",
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.phone) {
      alert("Preencha todos os campos!")
      return
    }

    if (editingId) {
      // Editar
      setContacts((prev) => prev.map((contact) => (contact.id === editingId ? { ...contact, ...formData } : contact)))
    } else {
      // Adicionar
      const newContact: Contact = {
        id: Date.now().toString(),
        ...formData,
      }
      setContacts((prev) => [...prev, newContact])
    }

    closeModal()
  }

  const deleteContact = (id: string) => {
    if (confirm("Excluir contato?")) {
      setContacts((prev) => prev.filter((contact) => contact.id !== id))
    }
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>
          My<span className={styles.blue}>Contacts</span>
        </h1>
        <p className={styles.subtitle}>Gerencie seus contatos</p>
      </div>

      {/* Main Content */}
      <div className={styles.main}>
        <div className={styles.appHeader}>
          <h2 className={styles.appTitle}>
            My<span className={styles.blue}>Contacts</span>
          </h2>
        </div>

        {/* Search */}
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Pesquisar contato..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        {/* Controls */}
        <div className={styles.controls}>
          <span className={styles.count}>{filteredContacts.length} contatos</span>
          <button onClick={() => openModal()} className={styles.newButton}>
            Novo contato
          </button>
        </div>

        {/* Table */}
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <span className={styles.headerText}>Nome ↑</span>
          </div>

          <div className={styles.tableBody}>
            {filteredContacts.length === 0 ? (
              <div className={styles.empty}>Nenhum contato encontrado</div>
            ) : (
              filteredContacts.map((contact) => (
                <div key={contact.id} className={styles.row}>
                  <div className={styles.contactInfo}>
                    <div className={styles.nameRow}>
                      <span className={styles.name}>{contact.name}</span>
                      <span className={styles.category}>{contact.category}</span>
                    </div>
                    <div className={styles.details}>
                      <div className={styles.email}>{contact.email}</div>
                      <div className={styles.phone}>{contact.phone}</div>
                    </div>
                  </div>
                  <div className={styles.actions}>
                    <button onClick={() => openModal(contact)} className={styles.editBtn} title="Editar">
                      ✏️
                    </button>
                    <button onClick={() => deleteContact(contact.id)} className={styles.deleteBtn} title="Excluir">
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>{editingId ? "Editar Contato" : "Novo Contato"}</h3>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.field}>
                <label>Nome *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Nome completo"
                  className={styles.input}
                />
              </div>

              <div className={styles.field}>
                <label>Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="email@exemplo.com"
                  className={styles.input}
                />
              </div>

              <div className={styles.field}>
                <label>Telefone *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="(11) 99999-9999"
                  className={styles.input}
                />
              </div>

              <div className={styles.field}>
                <label>Categoria</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                  className={styles.select}
                >
                  <option value="INSTAGRAM">INSTAGRAM</option>
                  <option value="FACEBOOK">FACEBOOK</option>
                  <option value="LINKEDIN">LINKEDIN</option>
                  <option value="TRABALHO">TRABALHO</option>
                  <option value="PESSOAL">PESSOAL</option>
                </select>
              </div>

              <div className={styles.buttons}>
                <button type="button" onClick={closeModal} className={styles.cancelBtn}>
                  Cancelar
                </button>
                <button type="submit" className={styles.saveBtn}>
                  {editingId ? "Salvar" : "Adicionar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
