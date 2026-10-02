type Note = {
  id: number;
  title: string;
  description: string;
};

type NoteItemProps = {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
};

export default function NoteItem({
  note,
  onEdit,
  onDelete,
}: NoteItemProps) {
  return (
    <div className="note">
      <h3>{note.title}</h3>
      <p>{note.description}</p>

      <button onClick={() => onEdit(note)}>Edit</button>

      <button onClick={() => onDelete(note.id)}>
        Delete
      </button>
    </div>
  );
}