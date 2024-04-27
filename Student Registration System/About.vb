Public Class About
    Private Sub About_FormClosed(sender As Object, e As FormClosedEventArgs) Handles Me.FormClosed
        MainForm.Enabled() = True
        MainForm.Show()
        Me.Hide()
    End Sub

    Private Sub About_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        Label1.Text = "Christine G. Quiroz"

        Label2.Text = "Age: 24 " & vbNewLine &
            "Sex: Female" & vbNewLine &
            "Birthday: January 10, 2000" & vbNewLine &
            """Trust the timing of your life; everything happens for a reason"""
    End Sub


End Class