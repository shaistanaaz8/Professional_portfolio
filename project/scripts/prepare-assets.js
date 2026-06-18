import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectDir = path.resolve(__dirname, '..');
const certsSrcDir = path.resolve(projectDir, '../CERTIFICATES');
// Previously a single expected filename. Now auto-detect newest professional image
// within the project folder (projectDir) or its parent, preferring files with
// profile/headshot keywords. Falls back to most recently modified image.
const profPicSrc = null;

const publicDir = path.resolve(projectDir, 'public');
const certsDestDir = path.resolve(publicDir, 'certificates');

const KNOWN_CERTIFICATES = {
  "Adobe_certificate.pdf": { title: "Adobe Certification", issuer: "Adobe", year: "2024", category: "Design" },
  "Agentathon_Certificate.pdf": { title: "Agentathon AI Hackathon Winner", issuer: "Lyzr AI & GFG", year: "2024", category: "Hackathons" },
  "BlueStock _Offerletter.pdf": { title: "Software Engineer Intern Offer Letter", issuer: "BlueStock FinTech", year: "2024", category: "Internships" },
  "Cisco C Advanced NQ.pdf": { title: "Advanced C Programming", issuer: "Cisco Networking Academy", year: "2025", category: "Cisco" },
  "Cisco Cyber_Essentials NQ.pdf": { title: "Cybersecurity Essentials", issuer: "Cisco Networking Academy", year: "2025", category: "Cisco" },
  "Cisco Exploring_Networking.pdf": { title: "Exploring Networking", issuer: "Cisco Networking Academy", year: "2025", category: "Cisco" },
  "Cisco Intro_to_CS NQ.pdf": { title: "Introduction to Cybersecurity", issuer: "Cisco Networking Academy", year: "2025", category: "Cisco" },
  "Cisco Intro_to_CS_badge.pdf": { title: "Introduction to Cybersecurity Badge", issuer: "Cisco Networking Academy", year: "2025", category: "Cisco" },
  "Cisco JavaScript_Essentials.pdf": { title: "JavaScript Essentials", issuer: "Cisco Networking Academy", year: "2025", category: "Cisco" },
  "Cisco Junior_CS.pdf": { title: "Junior Cybersecurity Analyst", issuer: "Cisco Networking Academy", year: "2025", category: "Cisco" },
  "Cisco Packet_Tracer.pdf": { title: "Introduction to Packet Tracer", issuer: "Cisco Networking Academy", year: "2025", category: "Cisco" },
  "Cisco_Python.pdf": { title: "Python Programming Foundations", issuer: "Cisco Networking Academy", year: "2025", category: "Cisco" },
  "GFG-AWS Architect Associate.pdf": { title: "AWS Solutions Architect Associate", issuer: "GeeksforGeeks", year: "2025", category: "Cloud & Tools" },
  "GFG-AWS Cloud.pdf": { title: "AWS Cloud Design Foundations", issuer: "GeeksforGeeks", year: "2025", category: "Cloud & Tools" },
  "GFG-Gen AI.pdf": { title: "Generative AI Foundations", issuer: "GeeksforGeeks", year: "2025", category: "AI & Machine Learning" },
  "GFG-IP Addressing.pdf": { title: "IP Addressing and Subnetting", issuer: "GeeksforGeeks", year: "2025", category: "Cloud & Tools" },
  "GFG-Product Management.pdf": { title: "Product Management Foundations", issuer: "GeeksforGeeks", year: "2025", category: "Other" },
  "GFG-Soft Skills.pdf": { title: "Professional Soft Skills", issuer: "GeeksforGeeks", year: "2025", category: "Other" },
  "Google_Badge.png": { title: "Google Cloud Badge", issuer: "Google Cloud", year: "2025", category: "Cloud & Tools" },
  "Hack-A-Tone Cer.pdf": { title: "Hack-A-Tone AI Challenge", issuer: "Hack-A-Tone", year: "2024", category: "Hackathons" },
  "IBMDesign20251218-32-ra8r7q.pdf": { title: "Enterprise Design Thinking Practitioner", issuer: "IBM", year: "2025", category: "IBM" },
  "IBMDesign_AI_fundamentals.pdf": { title: "IBM Design Thinking AI Fundamentals", issuer: "IBM", year: "2025", category: "IBM" },
  "ICAT-Aptitude test Cer.pdf": { title: "ICAT Aptitude Test Certificate", issuer: "ICAT", year: "2024", category: "Other" },
  "ISRO_hackathon_Certificate.pdf": { title: "ISRO Space Hackathon Certificate", issuer: "ISRO", year: "2024", category: "Hackathons" },
  "Infosys ds certificate.pdf": { title: "Infosys Springboard Data Science", issuer: "Infosys Springboard", year: "2025", category: "Infosys" },
  "Infosys py certificate.pdf": { title: "Infosys Springboard Python", issuer: "Infosys Springboard", year: "2025", category: "Infosys" },
  "Intro_LLM.png": { title: "Introduction to Large Language Models", issuer: "Google Cloud", year: "2024", category: "AI & Machine Learning" },
  "Lyzr_Cert_Shaista_Naaz.pdf": { title: "Lyzr AI Agent Developer Certification", issuer: "Lyzr AI", year: "2024", category: "AI & Machine Learning" },
  "Oracle_Data.pdf": { title: "Oracle Data Science Associate", issuer: "Oracle", year: "2025", category: "Oracle" },
  "Oracle_DevOps.pdf": { title: "Oracle Cloud Infrastructure DevOps", issuer: "Oracle", year: "2025", category: "Oracle" },
  "oracle-1.pdf": { title: "Oracle Cloud Infrastructure Foundations", issuer: "Oracle", year: "2025", category: "Oracle" },
  "oracle-3.pdf": { title: "Oracle Cloud Services Specialist", issuer: "Oracle", year: "2025", category: "Oracle" },
  "shak_oracle.pdf": { title: "Oracle Database SQL Certified Associate", issuer: "Oracle", year: "2025", category: "Oracle" },
  "PYTHON HR CER.pdf": { title: "HackerRank Python (Basic) Certificate", issuer: "HackerRank", year: "2024", category: "Programming" },
  "SHAISTA NAAZ_ISTE_CER.pdf": { title: "ISTE Student Chapter Membership Certificate", issuer: "ISTE", year: "2024", category: "Other" },
  "VibeathonX_CBIT.pdf": { title: "VibeathonX CBIT Participation", issuer: "CBIT", year: "2024", category: "Hackathons" },
  "eticket_WomeninAIFoundersMixer_T4130000265904041.pdf": { title: "Women in AI Founders Mixer Ticket", issuer: "Women in AI", year: "2024", category: "Other" }
};

// Clean directories
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

if (!fs.existsSync(certsDestDir)) {
  fs.mkdirSync(certsDestDir, { recursive: true });
}

// Copy Profile Picture - auto-detect newest professional photo
const IMAGE_EXTS = ['.png', '.jpg', '.jpeg', '.webp'];
const KEYWORDS = ['prof', 'profile', 'profile_pic', 'profile-picture', 'headshot', 'avatar', 'shaista', 'shaista_naaz'];

function findCandidateImages(rootDir) {
  let results = [];
  try {
    const files = fs.readdirSync(rootDir);
    for (const file of files) {
      const full = path.resolve(rootDir, file);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) continue;
      const ext = path.extname(file).toLowerCase();
      if (!IMAGE_EXTS.includes(ext)) continue;
      const lower = file.toLowerCase();
      // prefer files with keywords
      const score = KEYWORDS.reduce((s, k) => s + (lower.includes(k) ? 1 : 0), 0);
      results.push({ file: full, mtime: stat.mtimeMs, score });
    }
  } catch (e) {
    // ignore
  }
  return results;
}

let profileCandidates = [];
// search project dir and its parent
profileCandidates = profileCandidates.concat(findCandidateImages(projectDir));
profileCandidates = profileCandidates.concat(findCandidateImages(path.resolve(projectDir, '..')));

if (profileCandidates.length > 0) {
  // prefer higher score (keyword match), then most recent
  profileCandidates.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.mtime - a.mtime;
  });
  const chosen = profileCandidates[0].file;
  try {
    console.log('Copying detected Profile Picture:', chosen);
    fs.copyFileSync(chosen, path.resolve(publicDir, 'PROF_pic.jpeg'));
  } catch (e) {
    console.warn('Failed to copy detected profile image', e);
  }
} else {
  console.warn('WARNING: No profile image found in project directories');
}

// Copy and Index Certificates
const certificatesList = [];

if (fs.existsSync(certsSrcDir)) {
  console.log('Scanning Certificates folder...');
  const files = fs.readdirSync(certsSrcDir);

  files.forEach(file => {
    const filePath = path.resolve(certsSrcDir, file);
    const stat = fs.statSync(filePath);

    if (stat.isFile()) {
      // Resume Handling
      if (file.toLowerCase() === 'resume_26.pdf') {
        console.log(`Copying Resume to public folder...`);
        fs.copyFileSync(filePath, path.resolve(publicDir, 'resume.pdf'));
        return;
      }

      // Check if it's a PDF or Image
      const ext = path.extname(file).toLowerCase();
      if (['.pdf', '.png', '.jpg', '.jpeg'].includes(ext)) {
        // Copy to public/certificates
        const destPath = path.resolve(certsDestDir, file);
        fs.copyFileSync(filePath, destPath);

        // Build metadata
        let metadata = KNOWN_CERTIFICATES[file];
        if (!metadata) {
          // Robust Fallback Parser
          const baseName = path.basename(file, ext);
          const cleanName = baseName.replace(/[_-]/g, ' ').trim();
          let issuer = 'External';
          let category = 'Other';

          if (/cisco/i.test(cleanName)) {
            issuer = 'Cisco';
            category = 'Cisco';
          } else if (/oracle/i.test(cleanName)) {
            issuer = 'Oracle';
            category = 'Oracle';
          } else if (/ibm/i.test(cleanName)) {
            issuer = 'IBM';
            category = 'IBM';
          } else if (/gfg|geeksforgeeks/i.test(cleanName)) {
            issuer = 'GeeksforGeeks';
            category = 'Other';
          } else if (/infosys/i.test(cleanName)) {
            issuer = 'Infosys Springboard';
            category = 'Infosys';
          } else if (/lyzr/i.test(cleanName)) {
            issuer = 'Lyzr AI';
            category = 'AI & Machine Learning';
          } else if (/google/i.test(cleanName)) {
            issuer = 'Google';
            category = 'Cloud & Tools';
          } else if (/hackathon|hack|vibeathon|agentathon/i.test(cleanName)) {
            category = 'Hackathons';
          }

          // Capitalize Name
          const title = cleanName
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');

          metadata = {
            title,
            issuer,
            year: new Date().getFullYear().toString(),
            category
          };
        }

        certificatesList.push({
          fileName: file,
          filePath: `/certificates/${file}`,
          title: metadata.title,
          issuer: metadata.issuer,
          year: metadata.year,
          category: metadata.category
        });
      }
    }
  });

  // Write JSON metadata
  fs.writeFileSync(
    path.resolve(publicDir, 'certificates.json'),
    JSON.stringify(certificatesList, null, 2)
  );
  console.log(`Successfully indexed ${certificatesList.length} certificates.`);
} else {
  console.warn(`WARNING: Certificates directory not found at ${certsSrcDir}`);
}
