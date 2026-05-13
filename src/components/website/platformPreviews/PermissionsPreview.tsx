import ClientPermissions from "@/components/presentation/demo/views/ClientPermissions";

const PermissionsPreview = () => {
  return (
    <div>
      <div style={{ padding: "20px 24px 0 24px" }}>
        <h1
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 18,
            fontWeight: 700,
            color: "#0D0D0B",
          }}
        >
          Shift Manager Permissions
        </h1>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 12,
            color: "rgba(13,13,11,0.55)",
            marginTop: 2,
          }}
        >
          Define what each shift manager can do — by department.
        </p>
      </div>
      <ClientPermissions />
    </div>
  );
};

export default PermissionsPreview;
