import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ fontFamily: 'Microsoft YaHei, PingFang SC, sans-serif', backgroundColor: '#F9FAFB', color: '#1F2937', lineHeight: 1.6, margin: 0, padding: 0 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 40 }}>
        <h1 style={{ color: '#2563EB', fontSize: 36, marginBottom: 30, textAlign: 'center' }}>
          中国北京国际科技产业博览会
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 600, margin: '0 auto' }}>
          <LinkItem 
            href="/kebohui.html" 
            title="科博会首页" 
            description="中国北京国际科技产业博览会官方首页"
          />
          <LinkItem 
            href="/booth-ideal.html" 
            title="理想汽车线上展台" 
            description="理想汽车在科博会上的线上展台详情"
          />
          <LinkItem 
            href="/exhibition_platform.html" 
            title="大都会展数智平台" 
            description="展会产业数字图谱与服务平台"
          />
          <LinkItem 
            href="/douyin-video.html" 
            title="人民日报抖音视频" 
            description="内嵌人民日报官方抖音视频的页面"
          />
          <LinkItem 
            href="/register-test.html" 
            title="展会报名测试" 
            description="测试展会报名接口功能的页面"
          />
        </div>
        <div style={{ textAlign: 'center', marginTop: 60, color: '#6B7280', fontSize: 14 }}>
          <p>© 2026 中国北京国际科技产业博览会. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

function LinkItem({ href, title, description }) {
  return (
    <div style={{ 
      background: 'white', 
      padding: 20, 
      borderRadius: 12, 
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)', 
      textAlign: 'center', 
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 24px rgba(37, 99, 235, 0.15)'
      }
    }}>
      <Link 
        href={href} 
        style={{ 
          color: '#2563EB', 
          textDecoration: 'none', 
          fontSize: 20, 
          fontWeight: 600,
          '&:hover': {
            textDecoration: 'underline'
          }
        }}
      >
        {title}
      </Link>
      <div style={{ color: '#6B7280', marginTop: 10, fontSize: 14 }}>
        {description}
      </div>
    </div>
  );
}