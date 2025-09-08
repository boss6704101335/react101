import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { styles } from "./Styles";

const memberSchema = z.object({
  prefix: z.string().nonempty("กรุณาเลือกคำนำหน้า"),
  firstName: z.string().nonempty("กรุณากรอกชื่อ"),
  lastName: z.string().nonempty("กรุณากรอกนามสกุล"),
  photo: z.string().url("ต้องเป็น URL ของรูป"),
  workHistory: z.string().optional(),
  achievements: z.string().optional(),
  ministerPosition: z.string().optional(),
  ministry: z.string().optional(),
  party: z.string().nonempty("กรุณาระบุพรรค"),
});

type Member = z.infer<typeof memberSchema>;

function MemberForm() {
  const [members, setMembers] = useState<Member[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const { register, handleSubmit, reset } = useForm<Member>({
    resolver: zodResolver(memberSchema),
  });

  const onSubmit = (data: Member) => {
    if (editIndex !== null) {
      const newMembers = [...members];
      newMembers[editIndex] = data;
      setMembers(newMembers);
      setEditIndex(null);
    } else {
      setMembers([...members, data]);
    }
    reset();
  };

  const onDelete = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const onEdit = (index: number) => {
    setEditIndex(index);
    reset(members[index]);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ทำเนียบสมาชิกสภาผู้แทนราษฎร</h1>

      {/* ฟอร์มเพิ่ม / แก้ไขสมาชิก */}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.flexRow}>
          <select {...register("prefix")} className={styles.select}>
            <option value="">เลือกคำนำหน้า</option>
            <option value="นาย">นาย</option>
            <option value="นาง">นาง</option>
            <option value="นางสาว">นางสาว</option>
          </select>
          <input
            {...register("firstName")}
            placeholder="ชื่อ"
            className={`${styles.input} ${styles.flexItem}`}
          />
          <input
            {...register("lastName")}
            placeholder="นามสกุล"
            className={`${styles.input} ${styles.flexItem}`}
          />
        </div>

        <input
          {...register("photo")}
          placeholder="URL รูปถ่าย"
          className={styles.input}
        />

        <textarea
          {...register("workHistory")}
          placeholder="ประวัติการทำงาน"
          className={styles.textarea}
        />
        <textarea
          {...register("achievements")}
          placeholder="ผลงานที่ผ่านมา"
          className={styles.textarea}
        />

        <div className={styles.flexRow}>
          <input
            {...register("ministerPosition")}
            placeholder="ตำแหน่งรัฐมนตรี"
            className={`${styles.input} ${styles.flexItem}`}
          />
          <input
            {...register("ministry")}
            placeholder="กระทรวง"
            className={`${styles.input} ${styles.flexItem}`}
          />
        </div>

        <input
          {...register("party")}
          placeholder="สังกัดพรรคการเมือง"
          className={styles.input}
        />

        <button type="submit" className={styles.buttonAdd}>
          {editIndex !== null ? "แก้ไขสมาชิก" : "เพิ่มสมาชิก"}
        </button>
      </form>

      {/* รายชื่อสมาชิกทั้งหมด */}
      <ul className={styles.list}>
        {members.map((m, index) => (
          <li key={index} className={styles.listItem}>
            <div className={styles.memberInfo}>
              <img src={m.photo} alt="photo" className={styles.photo} />
              <div>
                <p className="font-bold">
                  {m.prefix} {m.firstName} {m.lastName}
                </p>
                <p>{m.workHistory}</p>
                <p>{m.achievements}</p>
                {m.ministerPosition && (
                  <p>
                    ตำแหน่ง: {m.ministerPosition} ({m.ministry})
                  </p>
                )}
                <p>สังกัดพรรค: {m.party}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => onEdit(index)}
                className={styles.buttonEdit}
              >
                แก้ไข
              </button>
              <button
                onClick={() => onDelete(index)}
                className={styles.buttonDelete}
              >
                ลบ
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MemberForm;
