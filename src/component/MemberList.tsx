type Member = {
  nameTH: string;
  nameEN: string;
  heightCm: number;
  age: number;
  imageUrl?: string;
  group?: string;
};

type MemberListProps = {
  members: Member[];
  groupName: string;
};

export default function MemberList({ members, groupName }: MemberListProps) {
  // กรองเอาเฉพาะสมาชิกในวงที่กำหนด
  const filteredMembers = members.filter((m) => m.group === groupName);

  return (
    <div>
      <ul>
        {filteredMembers.map((member, index) => (
          <li
            key={index}
            className={
              member.group === "BUS"
                ? "green-txt"
                : member.group === "Saja Boys"
                ? "blue-txt"
                : ""
            }
          >
            <strong>{member.nameTH}</strong> ({member.nameEN})  
            <br />
            อายุ: {member.age} ปี, สูง: {member.heightCm} ซม.
            <br />
            {member.imageUrl && (
              <img
                src={member.imageUrl}
                alt={member.nameEN}
                style={{ width: "100px", borderRadius: "10px" }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
