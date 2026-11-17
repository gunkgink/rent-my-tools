import RecordForm from "@/components/RecordForm";
export default function Page() {
  return (
    <section className="section">
      <h1>Add equipment</h1>
      <RecordForm kind="equipment" />
    </section>
  );
}
