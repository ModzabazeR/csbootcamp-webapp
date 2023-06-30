const groupIds = ["G99","G01", "G02", "G03", "G04", "G05", "G06", "G07", "G08", "G09", "G10", "G11", "G12"]
const groupNames = ["loading","เวิร์ม", "โทรจัน", "สปายแวร์", "บอทเน็ต", "XSS", "DDos", "ฟิชชิ่ง", "ไวรัส", "มัลแวร์", "แฮกเกอร์", "แครกเกอร์", "Sidejacking"]
const groupObj = Object.fromEntries(groupIds.map((_, i) => [groupIds[i], groupNames[i]]))

export const getGroupName = (groupId: string) => {
	return groupObj[groupId]
}