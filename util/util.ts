export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}


export const  formatTimeTo12Hour = (time24: string): string => {
  const { $i18n } = useNuxtApp() // ✅ Call here instead of top-level
  const t = $i18n.t
  const [hourStr, minute] = time24.split(':')
  let hour = parseInt(hourStr ?? "0")
  const ampm = hour >= 12 ? t('PM') : t('AM')
  hour = hour % 12 || 12
  return `${hour}:${minute ?? "00"} ${ampm}`
}