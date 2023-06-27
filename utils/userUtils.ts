const groupIds = ["G99","G01", "G02", "G03", "G04", "G05", "G06", "G07", "G08", "G09", "G10", "G11"]
const groupNames = ["loading","หมาน้ำ", "เพนกวินราชา", "ช้างทะเลทราย", "นางอาย", "คาปิบาร่า", "วอลรัส", "ชีตาห์", "ฟอสซ่า", "หมีขั้วโลก", "นาร์วาล", "เนียนแคท"]
const groupObj = Object.fromEntries(groupIds.map((_, i) => [groupIds[i], groupNames[i]]))

export const getGroupName = (groupId: string) => {
	return groupObj[groupId]
	// return groupId
}