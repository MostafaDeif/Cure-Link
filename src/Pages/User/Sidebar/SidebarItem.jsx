export default function SidebarItem({ label, section, activeSection, setActiveSection }) {
  return (
    <li
      className={`cursor-pointer p-2 rounded ${
        activeSection === section ? "bg-blue-100 text-blue-600" : ""
      }`}
      onClick={() => setActiveSection(section)}
    >
      {label}
    </li>
  );
}
