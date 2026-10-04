const fs = require('fs');
const path = require('path');

const dir = 'src/app/(student)';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') && f !== '_layout.tsx');

const colorMap = {
  "'#F4F7FA'": "theme.colors.background",
  "'#F8FAFC'": "theme.colors.background",
  "'#FFFFFF'": "theme.colors.surface",
  "'#0F172A'": "theme.colors.textPrimary",
  "'#1E293B'": "theme.colors.textPrimary",
  "'#334155'": "theme.colors.textPrimary",
  "'#64748B'": "theme.colors.textSecondary",
  "'#94A3B8'": "theme.colors.textMuted",
  "'#E2E8F0'": "theme.colors.border",
  "'#F1F5F9'": "theme.colors.borderLight",
  "'#0284C7'": "theme.colors.primary",
  "'#0B3B60'": "theme.colors.primary",
  "'#0EA5E9'": "theme.colors.info",
  "'#F0F9FF'": "theme.colors.infoBg",
  "'#E11D48'": "theme.colors.error",
  "'#F43F5E'": "theme.colors.error",
  "'#FEE2E2'": "theme.colors.errorBg",
  "'#16A34A'": "theme.colors.success",
  "'#10B981'": "theme.colors.success",
  "'#DCFCE7'": "theme.colors.successBg",
  "'#D1FAE5'": "theme.colors.successBg",
  "'#065F46'": "theme.colors.success", // darker green
  "'#F59E0B'": "theme.colors.warning",
  "'#D97706'": "theme.colors.warning",
  "'#FEF3C7'": "theme.colors.warningBg",
  "'#0D9488'": "theme.colors.teal",
  "'#CCFBF1'": "theme.colors.tealBg",
  "'#818CF8'": "theme.colors.academic",
  "'#F1ECFF'": "theme.colors.academicBg",
};

files.forEach(file => {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  
  if (!content.includes('useTheme')) {
    content = content.replace("import { View", "import { useTheme } from '../../theme/ThemeContext';\nimport { View");
  }
  
  if (!content.includes('const { theme } = useTheme();')) {
    // find default export function
    content = content.replace(/export default function ([A-Za-z0-9_]+)\(\) \{/, "export default function $1() {\n  const { theme } = useTheme();\n  const styles = getStyles(theme);");
  }
  
  // Replace StyleSheet.create
  if (content.includes('const styles = StyleSheet.create({')) {
    content = content.replace(/const styles = StyleSheet\.create\(\{/g, 'const getStyles = (theme: any) => StyleSheet.create({');
  }

  // Replace Hex Codes in Styles
  Object.keys(colorMap).forEach(hex => {
    // Replace hex in styles string
    const themeKey = colorMap[hex];
    content = content.split(hex).join(themeKey);
  });
  
  // Replace inline hex codes in JSX
  Object.keys(colorMap).forEach(hex => {
    const rawHex = hex.replace(/'/g, '');
    const themeKey = colorMap[hex];
    // e.g. color="#0F172A" -> color={theme.colors.textPrimary}
    const regex = new RegExp(`color="${rawHex}"`, 'g');
    content = content.replace(regex, `color={${themeKey}}`);
    
    const regexBg = new RegExp(`backgroundColor="${rawHex}"`, 'g');
    content = content.replace(regexBg, `backgroundColor={${themeKey}}`);
  });

  // Handle remaining raw hexes for borders, etc that might have been inline
  content = content.replace(/shadowColor:\s*theme\.colors\.textPrimary/g, "shadowColor: '#111827'"); // fix shadow colors
  content = content.replace(/borderRadius:\s*(12|16|24)/g, "borderRadius: theme.radius.card");

  fs.writeFileSync(path.join(dir, file), content);
});
console.log('Update complete.');
