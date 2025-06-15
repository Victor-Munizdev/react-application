import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export default function EstoqueManager() {
  const [materiais, setMateriais] = useState([]);
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  function adicionarOuEditarMaterial() {
    if (!nome || !quantidade) return;

    if (editandoId !== null) {
      setMateriais((prev) =>
        prev.map((mat) =>
          mat.id === editandoId ? { ...mat, nome, quantidade } : mat
        )
      );
      setEditandoId(null);
    } else {
      setMateriais((prev) => [
        ...prev,
        { id: Date.now(), nome, quantidade },
      ]);
    }
    setNome("");
    setQuantidade("");
  }

  function editarMaterial(material) {
    setNome(material.nome);
    setQuantidade(material.quantidade);
    setEditandoId(material.id);
  }

  function excluirMaterial(id) {
    setMateriais((prev) => prev.filter((mat) => mat.id !== id));
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Estoque</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Nome do Material"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <Input
              placeholder="Quantidade"
              type="number"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
            />
            <Button onClick={adicionarOuEditarMaterial}>
              {editandoId !== null ? "Salvar" : "Adicionar"}
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Material</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {materiais.map((material) => (
                <TableRow key={material.id}>
                  <TableCell>{material.nome}</TableCell>
                  <TableCell>{material.quantidade}</TableCell>
                  <TableCell>
                    <Button size="sm" onClick={() => editarMaterial(material)}>
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="ml-2"
                      onClick={() => excluirMaterial(material.id)}
                    >
                      Excluir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
