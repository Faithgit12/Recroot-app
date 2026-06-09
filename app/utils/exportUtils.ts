import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Alert } from 'react-native';

const REOOT_LOGO_BASE64 = "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";

const generateBaseHTML = (title: string, contentHTML: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
    body {
      font-family: 'Inter', -apple-system, sans-serif;
      padding: 40px;
      color: #0F172A;
      line-height: 1.6;
    }
    .watermark {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0.05;
      z-index: -1;
      width: 400px;
      pointer-events: none;
    }
    .header {
      border-bottom: 2px solid #183C6B;
      padding-bottom: 20px;
      margin-bottom: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo {
      height: 40px;
    }
    h1 {
      color: #183C6B;
      margin: 0;
      font-size: 28px;
    }
    .date {
      color: #64748B;
      font-size: 14px;
    }
    .section {
      margin-bottom: 30px;
    }
    .section-title {
      font-size: 18px;
      color: #183C6B;
      border-bottom: 1px solid #E2E8F0;
      padding-bottom: 8px;
      margin-bottom: 16px;
    }
    .score-box {
      background-color: #F1F5F9;
      border-radius: 8px;
      padding: 16px;
      text-align: center;
      margin-bottom: 24px;
    }
    .score-value {
      font-size: 36px;
      font-weight: bold;
      color: #183C6B;
    }
    ul {
      padding-left: 20px;
    }
    li {
      margin-bottom: 8px;
    }
    .tag {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 16px;
      font-size: 13px;
      margin-right: 8px;
      margin-bottom: 8px;
    }
    .tag-green {
      background-color: #DCFCE7;
      color: #166534;
    }
    .tag-red {
      background-color: #FEE2E2;
      color: #991B1B;
    }
    .question-box {
      background-color: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 16px;
    }
    .question-number {
      font-weight: bold;
      color: #183C6B;
      margin-right: 8px;
    }
  </style>
</head>
<body>
  <img src="data:image/png;base64,${REOOT_LOGO_BASE64}" class="watermark" />
  
  <div class="header">
    <div>
      <h1>${title}</h1>
      <div class="date">Generated on ${new Date().toLocaleDateString()}</div>
    </div>
    <img src="data:image/png;base64,${REOOT_LOGO_BASE64}" class="logo" />
  </div>

  ${contentHTML}

</body>
</html>
`;

export const exportMatchReport = async (scoreData: any) => {
  try {
    const html = generateBaseHTML('Match Score Report', `
      <div class="score-box">
        <div>Overall Match Score</div>
        <div class="score-value">${scoreData.overallScore ?? 0}%</div>
      </div>

      <div class="section">
        <h2 class="section-title">Matched Skills</h2>
        <div>
          ${(scoreData.matchedSkills || []).map((skill: string) => `<span class="tag tag-green">${skill}</span>`).join('')}
          ${(!scoreData.matchedSkills || scoreData.matchedSkills.length === 0) ? '<p>No matched skills found.</p>' : ''}
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">Missing Skills</h2>
        <div>
          ${(scoreData.missingSkills || []).map((skill: string) => `<span class="tag tag-red">${skill}</span>`).join('')}
          ${(!scoreData.missingSkills || scoreData.missingSkills.length === 0) ? '<p>No missing skills. Great match!</p>' : ''}
        </div>
      </div>

      ${scoreData.feedback ? `
      <div class="section">
        <h2 class="section-title">Feedback Analysis</h2>
        <p>${scoreData.feedback.replace(/\n/g, '<br>')}</p>
      </div>
      ` : ''}
    `);

    const { uri } = await Print.printToFileAsync({ html });
    
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Share Match Report',
        UTI: 'com.adobe.pdf'
      });
    } else {
      Alert.alert('Sharing is not available on this device');
    }
  } catch (error: any) {
    console.error(error);
    Alert.alert('Export Failed', error.message);
  }
};

export const exportInterviewReport = async (questions: string[]) => {
  try {
    const html = generateBaseHTML('Interview Prep Report', `
      <div class="section">
        <h2 class="section-title">Generated Questions</h2>
        ${questions.map((q, i) => `
          <div class="question-box">
            <span class="question-number">Q${i + 1}.</span> ${q}
          </div>
        `).join('')}
        ${questions.length === 0 ? '<p>No questions generated.</p>' : ''}
      </div>
      
      <div class="section">
        <h2 class="section-title">Preparation Tips</h2>
        <ul>
          <li>Use the STAR method (Situation, Task, Action, Result) to structure your answers.</li>
          <li>Keep your answers concise, ideally under 2-3 minutes per question.</li>
          <li>Review your resume and be prepared to speak about any bullet point.</li>
          <li>Prepare questions to ask the interviewer at the end.</li>
        </ul>
      </div>
    `);

    const { uri } = await Print.printToFileAsync({ html });
    
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Share Interview Prep Report',
        UTI: 'com.adobe.pdf'
      });
    } else {
      Alert.alert('Sharing is not available on this device');
    }
  } catch (error: any) {
    console.error(error);
    Alert.alert('Export Failed', error.message);
  }
};
